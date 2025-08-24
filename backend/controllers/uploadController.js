import uploadOnCloudinary from '../utils/cloudinary.js';
import fs from 'fs';
import File from '../models/File.js';

const uploadFile = async (req, res) => {
  try {
    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ message: 'File not found in request' });
    }

    const cloudinaryResult = await uploadOnCloudinary(localFilePath);
    fs.unlinkSync(localFilePath); // Delete local temp file

    if (!cloudinaryResult) {
      return res.status(500).json({ message: 'Upload to Cloudinary failed' });
    }

    const fileType = req.file.mimetype.startsWith('image')
      ? 'image'
      : req.file.mimetype.startsWith('video')
      ? 'video'
      : 'other';

    const newFile = new File({
      filename: cloudinaryResult.public_id,
      originalName: req.file.originalname,
      fileType,
      url: cloudinaryResult.secure_url,
      public_id: cloudinaryResult.public_id,
    });

    await newFile.save();

    res.status(200).json({
      message: 'File uploaded and saved to DB',
      data: {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
        message: 'File uploaded to Cloudinary',
      },
    });
  } catch (error) {
    console.error('uploadFile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default uploadFile;
