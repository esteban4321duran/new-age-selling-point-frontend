import axios from "axios";
import useSWR from "swr";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Sale} from "../interfaces";

const API_ROUTE = import.meta.env.VITE_API_HOST + 'sales';

async function fetcher() {
  const response = await axios.get(API_ROUTE, {withCredentials: true});
  return response.data;
}


export default function Sales() {
  const {data: sales, error} = useSWR<Sale[]>(API_ROUTE, fetcher);
  const navigate = useNavigate();

  const salesWithTotal = sales?.map((sale) => {
    return {
      id: sale.id,
      datetime: sale.dateTime,
      total: sale?.items
        .map(item => item.details.price * item.quantity)
        .reduce((acc, current) => {
          return acc + current;
        }, 0)
    }
  })

  let mainContent;

  mainContent = sales && sales.length !== 0 ? (
    <table role='grid'>
      <thead>
      <tr>
        <th scope="col">Sale ID</th>
        <th scope="col">Date</th>
        <th scope="col">Time</th>
        <th scope="col">Total</th>
      </tr>
      </thead>
      <tbody>
      {
        salesWithTotal && (
          salesWithTotal.map((sale, i) => {
            const datetime = new Date(sale.datetime);

            return (
              <tr key={i}>
                <th scope="row">{sale.id}</th>
                <td>{`${datetime.getMonth()}/${datetime.getDay()}/${datetime.getFullYear()}`}</td>
                <td>{`${datetime.getHours()}:${datetime.getMinutes()}`}</td>
                <td>${sale.total}</td>
              </tr>)
          })
        )
      }
      </tbody>
    </table>
  ) : <article>
    <hgroup>
      <h2>
        No sales have been registered yet
      </h2>
      <h3>
        Create a new sale to display it here
      </h3>
    </hgroup>
  </article>

  async function handleCreate() {
    try {
      const response = await axios.post<Sale>(API_ROUTE, {}, {withCredentials: true});
      const newSale = response.data;
      navigate('/sales/new/' + newSale.id);
    } catch (e) {
      console.error(e);
    }
  }

  return <>
    {mainContent}
    <button onClick={handleCreate}>
      New Sale
    </button>
  </>
}