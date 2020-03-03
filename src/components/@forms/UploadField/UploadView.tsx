import React from 'react';
import { CloseButton } from '../../Alert/CloseButton';

interface Props {
    uploadFile: Blob | null;
    onClose: () => void;
}

const UploadView = ({ uploadFile, onClose }: Props) => {
    const [image, setImage] = React.useState({ loading: false, url: null });

    React.useEffect(() => {
        if (!uploadFile) {
            return;
        }
        setImage((prevState) => ({ ...prevState, loading: true }));
        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => setImage({ loading: false, url: reader.result });
    }, [uploadFile]);

    const imagePreview = React.useMemo(() => {
        if (image.url) {
            return <img src={image.url} alt="photo" />;
        }
        return null;
    }, [image.url]);

    const classes = React.useMemo(() => 'btn btn-primary close-image', []);
    return (
        <div className="upload-view">
            {imagePreview}
            <CloseButton {...{ onClose, classes }} />
        </div>
    );
};

export default UploadView;
