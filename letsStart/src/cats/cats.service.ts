import { Request, Response } from "express";
import { Cat, CatType } from "./cats.model";

//* READ 전체 고양이 데이터 조회
export const readAllCat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    res.status(200).send({ success: true, data: { cats } });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

//* READ 특정 고양이 데이터 조회
export const readCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cat = Cat.find((cat) => cat.id === id);
    res.status(200).send({ success: true, data: { cat } });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

// * CREATE 새로운 고양이 추가 api
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    Cat.push(data); // create
    res.status(200).send({ success: true, data });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

//* UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = body;
        result = cat;
      }
    });

    res.status(200).send({ success: true, data: { cat: result } });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });

    res.status(200).send({ success: true, data: { cat: result } });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

//* DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newCat = Cat.filter((cat) => cat.id !== id);

    res.status(200).send({ success: true, data: newCat });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};
