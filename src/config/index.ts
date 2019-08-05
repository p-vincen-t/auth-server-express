import { Auth as AuthConfig } from "./default/auth";

import { Mail as ProdMail } from "./prod/mail";
import { Mail as DevMail } from "./dev/mail";
import { Mail as TestMail } from "./test/mail";

import { dbUrl as ProdDbUrl } from "./prod/db";
import { dbUrl as DevDbUrl } from "./dev/db";
import { dbUrl as TestDbUrl } from "./test/db";

export const Mail =
  process.env.NODE_ENV === 'dev'
    ? DevMail
    : process.env.NODE_ENV === 'test'
    ? TestMail
    : ProdMail;

export const DbUrl =
  process.env.NODE_ENV === 'dev'
    ? DevDbUrl
    : process.env.NODE_ENV === 'test'
    ? TestDbUrl
    : ProdDbUrl;

export const Auth = AuthConfig

