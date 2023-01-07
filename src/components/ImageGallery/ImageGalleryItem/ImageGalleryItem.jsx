import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ description, smallImage, largeImage }) => {
  return (
    <Item>
      <Image src={smallImage} alt={description} />
    </Item>
  );
};
