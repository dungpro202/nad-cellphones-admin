export const api='http://localhost:8081/api';

export const urlpublic='http://localhost:2001/public'

export const generatePublicUrl =(filename) => {
    return `http://localhost:2001/public/${filename}`;
}
