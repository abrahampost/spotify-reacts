import { useHistory } from 'react-router';

export const useQueryParams = (): URLSearchParams => {
    const history = useHistory();
    const query = new URLSearchParams(history.location.search);
    return query;
}