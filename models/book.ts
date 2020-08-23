export interface IBookQuery {
  id: string;
  volumeInfo: {
    title: string;
  };
}

export interface IFetchBooksOptions {
  text?: string;
  page?: number;
}
