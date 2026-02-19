export const SERVICE_SELECTED_EVENT = "calcont:service-selected";

export type ServiceSelectedDetail = {
  serviceId: string;
};

export function dispatchServiceSelectedEvent(serviceId: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ServiceSelectedDetail>(SERVICE_SELECTED_EVENT, {
      detail: { serviceId }
    })
  );
}
