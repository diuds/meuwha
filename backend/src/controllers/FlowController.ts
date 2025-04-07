import { Request, Response } from "express";
import * as Yup from "yup";
import AppError from "../errors/AppError";
import Flow from "../models/Flow";
import Whatsapp from "../models/Whatsapp";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const flows = await Flow.findAll({
    include: [{ model: Whatsapp, as: "whatsapps" }]
  });
  return res.status(200).json(flows);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    flow: Yup.object().required(),
    description: Yup.string()
  });

  try {
    await schema.validate(req.body);
  } catch (err) {
    throw new AppError(err.message);
  }

  const { name, flow, description } = req.body;

  const flowExists = await Flow.findOne({
    where: { name }
  });

  if (flowExists) {
    throw new AppError("ERR_FLOW_NAME_ALREADY_EXISTS");
  }

  const flowCreated = await Flow.create({
    name,
    flow,
    description
  });

  return res.status(200).json(flowCreated);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { flowId } = req.params;

  const flow = await Flow.findByPk(flowId, {
    include: [{ model: Whatsapp, as: "whatsapps" }]
  });

  if (!flow) {
    throw new AppError("ERR_FLOW_NOT_FOUND");
  }

  return res.status(200).json(flow);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    flow: Yup.object(),
    description: Yup.string()
  });

  try {
    await schema.validate(req.body);
  } catch (err) {
    throw new AppError(err.message);
  }

  const { flowId } = req.params;
  const flowData = req.body;

  const flow = await Flow.findByPk(flowId);

  if (!flow) {
    throw new AppError("ERR_FLOW_NOT_FOUND");
  }

  await flow.update(flowData);

  return res.status(200).json(flow);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { flowId } = req.params;

  const flow = await Flow.findByPk(flowId);

  if (!flow) {
    throw new AppError("ERR_FLOW_NOT_FOUND");
  }

  await flow.destroy();

  return res.status(200).json({ message: "Flow deleted" });
};