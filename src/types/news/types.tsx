interface CategoryProps {
   name: string;
}

export interface NewsProps {
   slug: string;
   title: string;
   description: string;
   categories: CategoryProps[]
}

export interface OnKeyDownEvent {
   key: string;
}

interface CategoryPropsWithID extends CategoryProps {
   id: number;
}

export interface NewFormProps {
   categories: CategoryPropsWithID[]
}