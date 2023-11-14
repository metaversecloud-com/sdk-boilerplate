import { DroppedAsset } from "../topiaInit.js";
import error from "../errors.js";

export const getDroppedAssetDetails = async (req, res) => {
  try {
    const { assetId, interactivePublicKey, interactiveNonce, urlSlug, visitorId } = req.query;
    const { instanceId } = req.query;
    const { includeDataObject } = req.body;
    const droppedAsset = await DroppedAsset.get(instanceId, urlSlug, {
      credentials: {
        assetId,
        interactiveNonce,
        interactivePublicKey,
        visitorId,
      },
    });
    if (includeDataObject) await droppedAsset.fetchDataObject();
    if (res) res.json({ droppedAsset, success: true });
    return droppedAsset;
  } catch (e) {
    error("Getting dropped asset instance and data object", e, res);
  }
};
