import {UploadedFile} from "express-fileupload";

export const allowedImageExts = ['jpg', 'jpeg', 'png', 'gif'];
const validateRegex = new RegExp(`.(${allowedImageExts.join('|')})$`, 'i');

export function validateImage(image: UploadedFile) {
  const isValidExt = validateRegex.test(image?.name);
  const isGifExt = /.gif$/i.test(image?.name);
  if (!isValidExt) throw { status: 400, error: 'Allowed image extensions: ' + allowedImageExts.join(', ') };

  const sizeMb = image.size / 1024 / 1024;
  if (sizeMb > 1.5 && !isGifExt) throw { status: 400, error: 'Max regular image size is 1.5 MB' };
  if (sizeMb > 10 && isGifExt) throw { status: 400, error: 'Max gif image size is 10 MB' };
}
