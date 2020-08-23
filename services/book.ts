import axios from "axios";
import { IBookQuery } from "../models";

const MAX_RESULTS = 20;
let timer: number | undefined;
let currentPage = 0;

class BookService {
  fetchByQuery(query: string, page?: number): Promise<IBookQuery[]> {
    return new Promise((resolve) => {
      if (timer !== undefined) clearTimeout(timer);
      if (page === 0) currentPage = 0;

      console.log(currentPage);

      if (query === "") return resolve([]);
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
        currentPage * MAX_RESULTS
      }&maxResults=${MAX_RESULTS}&fields=items.id,items.volumeInfo.title`;
      timer = setTimeout(() => {
        axios
          .get(url)
          .then((res) => {
            currentPage++;
            resolve(res.data.items);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            timer = undefined;
            resolve([]);
          });
      }, 1000);
    });
  }
}

export const bookService = new BookService();
