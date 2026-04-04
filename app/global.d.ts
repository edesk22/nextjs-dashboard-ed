// En: app/global.d.ts  (o en la raíz como global.d.ts)
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '@/app/ui/global.css' {
  const content: never;
  export default content;
}