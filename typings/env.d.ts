// Copyright (c) 2023 Yağız Işkırık
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXTAUTH_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    DATABASE_URL: string;
    SECRET: string;
  }
}
