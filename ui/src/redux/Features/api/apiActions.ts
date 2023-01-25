import { createAction } from '@reduxjs/toolkit';

interface ApiRequestPayload {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    onSuccess: string;
    onError: string;
}

//EVENT ACTIONS (TRIGGERS)
export const apiRequest = createAction<ApiRequestPayload>('api/apiRequest');