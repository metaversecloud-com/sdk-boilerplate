import { DroppedAsset } from "../topiaInit.js";

export const getDroppedAssetDetails = async (req, res) => {
  try {
    const { assetId, interactivePublicKey, interactiveNonce, urlSlug, visitorId } = req.query;
    const droppedAsset = await DroppedAsset.get(assetId, urlSlug, {
      credentials: {
        visitorId,
        interactiveNonce,
        interactivePublicKey,
      },
    });
    if (res) res.json({ droppedAsset, success: true });
  } catch (error) {
    console.log("Error getting asset and data object", error);
    if (res) res.status(500).send({ error, success: false });
  }
};
