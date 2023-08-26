import React, { Suspense } from "react";
import { Await } from "react-router-dom";

type DeferredProps<TData> = {
  loadingElement: React.ReactNode;
  errorElement: React.ReactNode;
  data: TData;
  children: (data: Awaited<TData>) => React.ReactNode;
  /** Override loading status. */
  isLoading?: boolean;
};

export const Deferred = <TData,>(props: DeferredProps<TData>) => {
  if (props.isLoading && props.loadingElement)
    return <>{props.loadingElement}</>;

  return (
    <Suspense fallback={props.loadingElement}>
      <Await resolve={props.data} errorElement={props.errorElement}>
        {props.children}
      </Await>
    </Suspense>
  );
};
