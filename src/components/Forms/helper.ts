import { Dispatch } from 'redux';
import { setAvatar } from '../../redux/FormRedux/FormActions';

export const addAvatar = async (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<{
    type: string;
    payload: string;
  }>,
) => {
  const src = await new Promise((resolve, reject) => {
    const file: Blob = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          let { width } = img;
          let { height } = img;
          const maxWidth = 500;
          const maxHeight = 800;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width));
              width = maxWidth;
            }
          }
          if (width < height) {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height));
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const newImage = canvas.toDataURL('image/jpeg', 0.25);
          dispatch(setAvatar(newImage));
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    }
  });
  return src;
};
