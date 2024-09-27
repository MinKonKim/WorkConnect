import { UseFormRegister } from 'react-hook-form';

export type Tregister = UseFormRegister<{
  name: string | undefined;
  image: null;
  email: string | null | undefined;
  phone: string | null | undefined;
}>;
