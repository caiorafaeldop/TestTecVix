import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directories exist
const createDirIfNotExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";

    // Determine sub-folder based on field name or other logic if needed
    // For now, we can categorize by type if passed in body or just generic
    if (file.fieldname === "logo") {
      uploadPath += "logos/";
    } else if (file.fieldname === "avatar") {
      uploadPath += "avatars/";
    } else {
      uploadPath += "others/";
    }

    createDirIfNotExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalName
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage: storage });
