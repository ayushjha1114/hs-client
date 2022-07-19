/** 
 * Define the action contant 
*/
export const IS_LOADING = 'IS_LOADING';

export const isLoading = (data) => {
    return {
        type: IS_LOADING,
        payload: data
    };
}