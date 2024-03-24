// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createApi } from 'unsplash-js';

export default function Unsplash() {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_API_KEY || '',
  });
  const results = unsplash.search.getPhotos({
    query: 'cat',
    page: 1,
    perPage: 10,
  });
  return <p>{JSON.stringify(results)}</p>;
}
