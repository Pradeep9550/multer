import uploadOnCloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const uploadFile = async (req, res) => {
  try {
    // console.log('Uploaded file:', req.file);

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({ message: 'File not found in request' });
    }

    const cloudinaryResult = await uploadOnCloudinary(localFilePath);

    // console.log("response", cloudinaryResult)

    
    fs.unlinkSync(localFilePath);

    if (!cloudinaryResult) {
      return res.status(500).json({ message: 'Upload to Cloudinary failed' });
    }

    res.status(200).json({
      message: 'File uploaded to Cloudinary',
      url: cloudinaryResult.secure_url,
      public_id: cloudinaryResult.public_id,
    });
  } catch (error) {
    console.error('uploadFile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default uploadFile;
