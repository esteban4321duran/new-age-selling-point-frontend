import axios from "axios";
import useSWR, {mutate} from "swr";
import {Link, useNavigate, useParams} from "react-router-dom"
import React, {useEffect} from "react";
import {Sale} from "../interfaces";
import {SubmitHandler, useForm} from "react-hook-form";

const SINGLE_SALE = import.meta.env.VITE_API_HOST + 'sales/:saleId';
const SALE_ITEMS_ROUTE = import.meta.env.VITE_API_HOST + 'sales/:saleId/saleItems';
const SINGLE_SALE_ITEM_ROUTE = import.meta.env.VITE_API_HOST + 'sales/:saleId/saleItems/:saleItemId';

async function fetcher(url: string) {
  const response = await axios.get(url, {withCredentials: true});
  return response.data;
}

interface Inputs {
  itemCode: string;
  quantity: number;
}

export default function NewSale() {

  const navigate = useNavigate();
  const params = useParams();
  const url = SALE_ITEMS_ROUTE.replace(
    ':saleId',
    params.saleId as string
  );
  const {data: sale, error, mutate} = useSWR<Sale>(
    url,
    fetcher.bind(null, url)
  );
  let total: number;
  if (sale && sale?.items.length !== 0) {
    total = sale?.items
      .map(item => item.details.price * item.quantity)
      .reduce((acc, current) => {
        return acc + current;
      }, 0);
  } else
    total = 0;

  const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
  useEffect(() => {
    if (error) {
      navigate('/not-found', {replace: true});
    }
  }, [error]);

  if (sale?.finished)
    return (
      <>
        <h2>This sale has already been finished</h2>
        <Link to='/sales'>Go Back</Link>
      </>
    );

  const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
    try {
      const response = await axios.post(SALE_ITEMS_ROUTE.replace(
        ':saleId',
        params.saleId as string
      ), {
        itemCode: inputData.itemCode,
        quantity: inputData.quantity,
      }, {withCredentials: true});
      mutate();
    } catch (e: any) {
      console.error(e)
      // if (isAxiosError(e)) {
      //   console.error(e.response?.data.message);
      // }
      return;
    }
  }

  async function removeItem(itemIndex: number) {
    try {
      await axios.delete(SINGLE_SALE_ITEM_ROUTE
          .replace(
            ':saleId',
            params.saleId as string
          ).replace(
            ':saleItemId',
            sale!.items[itemIndex].id.toString()
          ),
        {
          withCredentials: true
        });
      mutate();
    } catch (e) {
      console.error(e)
      return;
    }
  }

  async function finishSale() {
    try {
      await axios.patch(
        SINGLE_SALE.replace(':saleId', params.saleId as string),
        {finished: true},
        {withCredentials: true}
      );
      navigate('/sales');
    } catch (e) {
      console.error(e)
      return;
    }
  }

  return <>
    <h2>
      Sale #{sale?.id}
    </h2>
    <div className='grid'>
      <article>
        <h3>Add Item</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="item-code">
            Item Code
            <input type="text" id="item-code" required {...register('itemCode')}/>
          </label>
          {errors.itemCode && (
            <section>
              <small>This field is required</small>
            </section>
          )}
          <label htmlFor="quantity">
            Quantity
            <input type="number" id="quantity" required min={1} defaultValue={1} {...register('quantity')}/>
          </label>
          {errors.quantity && (
            <section>
              <small>This field is required</small>
            </section>
          )}
          <button type='submit'>Add Item</button>
        </form>
      </article>
      <div>
        <table>
          <thead>
          <th scope='col'>Item Code</th>
          <th scope='col'>Item Description</th>
          <th scope='col'>Unit Price</th>
          <th scope='col'>Quantity</th>
          <th scope='col'></th>
          </thead>
          <tbody>
          {
            sale ? (
              sale.items.map((item, i) => {
                return (
                  <tr key={i}>
                    <th scope='row'>{item.details.id}</th>
                    <td>{item.details.description}</td>
                    <td>{item.details.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <a onClick={removeItem.bind(null, i)}>Remove</a>
                    </td>
                  </tr>
                )
              })
            ) : null
          }

          </tbody>
        </table>
        {
          <p style={{textAlign: 'right'}}>
            {`Total: $${total}`}
          </p>
        }
      </div>
    </div>
    <button onClick={finishSale}>Finish Sale
    </button>
  </>
}