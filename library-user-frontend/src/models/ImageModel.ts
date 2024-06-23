class ImageModel {
    image_id?: number;
    image_link?: string;
    image_avatar?: boolean;
    data: string;

    constructor(image_id: number, image_link: string, image_avatar: boolean, data: string) {
        this.image_id = image_id;
        this.image_link = image_link;
        this.image_avatar = image_avatar;
        this.data = data;
    }
}

export default ImageModel;
