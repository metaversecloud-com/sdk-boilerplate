import express from "express";
import {
  handleDropAsset,
  handleGetDroppedAssetsWithUniqueName,
  handleGetWorldDetails,
  handleGetDroppedAsset,
  handleGetVisitor,
  handleUpdateWorldDataObject,
  handleRemoveDroppedAssets,
  moveVisitor,
} from "./controllers/index.js";
import { checkInteractiveCredentials } from './middleware/checkInteractiveCredentials.js';
import { getVersion } from "./utils/getVersion.js";

const router = express.Router();

router.get("/system/health", (req, res) => {
  return res.json({
    appVersion: getVersion(),
    status: "OK",
    envs: {
      NODE_ENV: process.env.NODE_ENV,
      INSTANCE_DOMAIN: process.env.INSTANCE_DOMAIN,
      INTERACTIVE_KEY: process.env.INTERACTIVE_KEY,
      S3_BUCKET: process.env.S3_BUCKET,
    },
  });
});

// Dropped Assets
router.get("/dropped-asset-with-unique-name", checkInteractiveCredentials, handleGetDroppedAssetsWithUniqueName);
router.post("/dropped-asset", checkInteractiveCredentials, handleDropAsset);
router.get("/dropped-asset", checkInteractiveCredentials, handleGetDroppedAsset);
router.delete("/dropped-asset", checkInteractiveCredentials, handleRemoveDroppedAssets);

// Visitor
router.get("/visitor", checkInteractiveCredentials, handleGetVisitor);
router.put("/visitor/move", checkInteractiveCredentials, moveVisitor);

// World
router.get("/world", checkInteractiveCredentials, handleGetWorldDetails);
router.put("/world/data-object", checkInteractiveCredentials, handleUpdateWorldDataObject);

export default router;
