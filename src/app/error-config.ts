export interface IError{
    code: number;
    message: string;
    annotation: string;
}
export const errorDict = new Map<number, IError>();
errorDict.set(404, {code: 404, message: 'СТРАНИЦА НЕ НАЙДЕНА',
    annotation:'страница, на которую вы пытаетесь попасть, не существует или была удалена перейдите на главную страницу'});
errorDict.set(403, {code: 403, message: 'ДОСТУП ЗАПРЕЩЕН',
    annotation:'у вас нет прав для перехода на эту страницу'});
