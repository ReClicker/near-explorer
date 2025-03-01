import { NextApiHandler } from "next";
import { isNetworkOffline, respondNetworkOffline } from "../../libraries/api";
import { getNearNetworkName } from "../../libraries/config";
import { getTrpcClient } from "../../libraries/trpc";

const handler: NextApiHandler = async (req, res) => {
  try {
    let ipAddress =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    const networkName = getNearNetworkName(req.query, req.headers.host);
    if (isNetworkOffline(networkName)) {
      return respondNetworkOffline(res, networkName);
    }

    await getTrpcClient(networkName).mutation("telemetry.upsert", {
      ...req.body,
      ipAddress,
    });
    res.send({});
  } catch (error) {
    console.error(`Handler ${req.url} failed:`, error);
    res.status(400).send(error);
  }
};

export default handler;
