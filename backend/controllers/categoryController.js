import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
//create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    //Not duplicate category
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errror,
      message: "Error in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//Get all category
export const categoryController=async(req,res)=>{
        try {
            const category=await categoryModel.find({
            });
            res.status(200).send({
            success:true,
            message:"All Category List",
            category,

            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
            success:false,
            error,
            message:"Error while getting all category"
            })
        }
}

//get single category
export const singleCategoryController=async(req,res)=>{
 try {
   
     const category=await categoryModel.findOne({slug:req.params.slug})
     res.status(200).send({
     success:true.valueOf,
     message:"Getting Single Category Successfully ",
   category,
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
    success:false,
    error,
    message:"Error while gettin g Single Category"
    })
 }
}

//delete category controller
export const deleteCategoryController=async(req,res)=>{
    try {
        const{id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
        success:true,
        message:"Deleted Category Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
        success:false,
        message:"Error while deleting",
        error
        })
    }
}