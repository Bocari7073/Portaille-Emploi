// import multer from "multer";

// const storage = multer.diskStorage({});

// const upload = multer({ storage });

// export default upload;


// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // dossier pour stocker images et CV
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });
// export default upload;

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") cb(null, "uploads/images");
    else if (file.fieldname === "resume") cb(null, "uploads/resumes");
    else cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
export default upload;
