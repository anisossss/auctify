import express from "express";
import {
  companiesList,
  usersList,
  totalUsers,
  totalDannos,
  totalParticipants,
  totalCompanies,
  totalProds,
  totalProdsDannos,
  ProdsByCompanyId,
  totalProdsByCompanyId,
  productsParticipationByCompanyId,
  getTotalProductParticipatedByCompanyId,
  searchUsersByName,
  searchCompaniesByName,
  searchProductsByName,
  totalProductsDannosPerMonth,
  totalDannosParticipationPerMonth,
  totalAmountByCompany,
  topParticipant,
  lastAddedProducts, getParticipationCount, companyRapport, productRapport, usersRapport, acceptCompanyRequest,
} from "../controllers/AdminController.js";

import { createNote, getNotesByUserId } from "../controllers/Notes.js";
import { getInfosByCompanyId } from "../controllers/Company.js";

const router = express.Router();

router.get("/companiesList", companiesList);
router.get("/usersList", usersList);
router.get("/totalUsers", totalUsers);
router.get("/totalProds", totalProds);
router.get("/totalProdsDannos", totalProdsDannos);
router.get("/totalCompanies", totalCompanies);
router.get("/totalDannos", totalDannos);
router.get("/totalParticipant", totalParticipants);
router.post("/createNote/:id", createNote);
router.get("/getNotesByUserId/:id", getNotesByUserId);
router.get("/getInfosByCompanyId/:id", getInfosByCompanyId);
router.get("/ProdsByCompanyId/:id", ProdsByCompanyId);
router.get("/totalProdsByCompanyId/:id", totalProdsByCompanyId);
router.get("/productsParticipationByCompanyId/:companyId", productsParticipationByCompanyId);
router.get("/getTotalProductParticipatedByCompanyId/:id", getTotalProductParticipatedByCompanyId);
router.post("/searchUsersByName", searchUsersByName);
router.post("/searchCompaniesByName", searchCompaniesByName);
router.post("/searchProductsByName", searchProductsByName);
router.get("/totalProductsDannosPerMonth", totalProductsDannosPerMonth);
router.get("/totalDannosParticipationPerMonth", totalDannosParticipationPerMonth);
router.get("/totalAmountByCompany", totalAmountByCompany);
router.get("/topParticipant", topParticipant);
router.get("/lastAddedProducts", lastAddedProducts);
router.post("/getParticipationCount", getParticipationCount);

router.patch("/acceptCompanyRequest/:companyId", acceptCompanyRequest);
router.post("/companyRapport", companyRapport);
router.post("/productRapport", productRapport);
router.post("/usersRapport", usersRapport);

export { router as adminRouter };
