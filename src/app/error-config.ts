export interface IError{
    code: number;
    message: string;
    annotation: string;
}
export const errorDict = new Map<number, IError>();
errorDict.set(404, {code: 404, message: 'страница не найдена',
    annotation:'страница, на которую вы пытаетесь попасть, не существует или была удалена'});
errorDict.set(403, {code: 403, message: 'доступ запрещен',
    annotation:'у вас нет прав для перехода на эту страницу'});
