import multer from 'multer'


const storage = multer.diskStorage({
    destination: "./public/upload",
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  

// Optional: Allow only image/video
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // ✅ 100 MB limit
  },
});

export default upload;