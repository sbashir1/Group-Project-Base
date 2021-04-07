/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the UMD Dining API!');
});

/// /////////////////////////////////
/// ////Restaurant Endpoints////////
/// /////////////////////////////////
router.get('/dining', async (req, res) => {
  try {
    const halls = await db.DiningHall.findAll();
    const reply = halls.length > 0 ? { data: halls } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/dining/:hall_id', async (req, res) => {
  try {
    const hall = await db.DiningHall.findAll({
      where: {
        hall_id: req.params.hall_id
      }
    });

    res.json(hall);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/dining', async (req, res) => {
  const halls = await db.DiningHall.findAll();
  const currentId = (await halls.length) + 1;
  try {
    const newDining = await db.DiningHall.create({
      hall_id: currentId,
      hall_name: req.body.hall_name,
      hall_address: req.body.hall_address,
      hall_lat: req.body.hall_lat,
      hall_long: req.body.hall_long
    });
    res.json(newDining);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/dining/:hall_id', async (req, res) => {
  try {
    await db.DiningHall.destroy({
      where: {
        hall_id: req.params.hall_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/dining', async (req, res) => {
  try {
    await db.DiningHall.update(
      {
        hall_name: req.body.hall_name,
        hall_location: req.body.hall_location
      },
      {
        where: {
          hall_id: req.body.hall_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// ///////////////////////////////////////
/// Restaurant Monument Endpoints//////////
/// ///////////////////////////////////////
router.get('/meals', async (req, res) => {
  try {
    const meals = await db.Meals.findAll();
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/meals/:meal_id', async (req, res) => {
  try {
    const meals = await db.Meals.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/meals', async (req, res) => {
  try {
    await db.Meals.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Meal Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// ///////////////////////////////////
/// ////////Monument Endpoints/////////
/// //////////////////////////////////
router.get('/macros', async (req, res) => {
  try {
    const macros = await db.Macros.findAll();
    res.send(macros);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/macros/:meal_id', async (req, res) => {
  try {
    const meals = await db.Macros.findAll({
      where: {
        meal_id: req.params.meal_id
      }
    });
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/macros', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.Macros.update(
      {
        meal_name: req.body.meal_name,
        meal_category: req.body.meal_category,
        calories: req.body.calories,
        serving_size: req.body.serving_size,
        cholesterol: req.body.cholesterol,
        sodium: req.body.sodium,
        carbs: req.body.carbs,
        protein: req.body.protein,
        fat: req.body.fat
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// Restaurants Awards Endpoints/////
/// /////////////////////////////////
router.get('/restrictions', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll();
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/restrictions/:restriction_id', async (req, res) => {
  try {
    const restrictions = await db.DietaryRestrictions.findAll({
      where: {
        restriction_id: req.params.restriction_id
      }
    });
    res.json(restrictions);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// ////////////////////////////////////////////
/// ////////////Awards Endpoints///////////////
/// //////////////////////////////////////////



/// ///////////////////////////////////
/// /////////Food Endpoints////////////
/// //////////////////////////////////




/// ////////////////////////////////////////////
/// ////////Restaurant Chefs Endpoints//////////
/// //////////////////////////////////////////

router.get('/Rest_Chef', async (req, res) => {
  try {
    const restChef = await db.Rest_Chef.findAll();
    res.json(restChef);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/Rest_Chef/:restaurant_id', async (req, res) => {
  try {
    const restChef = await db.Rest_Chef.findAll({
      where: {
        restaurant_id: req.params.restaurant_id
      }
    });
    res.json(restChef);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/Rest_Chef', async (req, res) => {
  try {
    await db.Rest_Chef.update(
      {
        chef_id: req.body.chef_id
      },
      {
        where: {
          restaurant_id: req.body.restaurant_id
        }
      }
    );
    res.send('Rest_Chef Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// ////////////////////////////////////////////
/// ////////Chefs Endpoints//////////
/// //////////////////////////////////////////

router.get('/Chefs', async (req, res) => {
  try {
    const chefs = await db.Chefs.findAll();
    res.json(chefs);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/Chefs/:chef_id', async (req, res) => {
  try {
    const chefs = await db.Chefs.findAll({
      where: {
        chef_id: req.params.chef_id
      }
    });
    res.json(chefs);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/Chefs', async (req, res) => {
  try {
    await db.Chefs.update(
      {
        chef_firstname: req.body.chef_firstname,
        chef_lastname: req.body.chef_lastname
      },
      {
        where: {
          chef_id: req.body.chef_id
        }
      }
    );
    res.send('Chef Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// //////////////////////////////////
/// ///////Custom SQL Endpoint////////
/// /////////////////////////////////
// const macrosCustom = 'SELECT `Dining_Hall_Tracker`.`Meals`.`meal_id` AS `meal_id`,`Dining_Hall_Tracker`.`Meals`.`meal_name` AS `meal_name`,`Dining_Hall_Tracker`.`Macros`.`calories` AS `calories`,`Dining_Hall_Tracker`.`Macros`.`carbs` AS `carbs`,`Dining_Hall_Tracker`.`Macros`.`sodium` AS `sodium`,`Dining_Hall_Tracker`.`Macros`.`protein` AS `protein`,`Dining_Hall_Tracker`.`Macros`.`fat` AS `fat`,`Dining_Hall_Tracker`.`Macros`.`cholesterol` AS `cholesterol`FROM(`Dining_Hall_Tracker`.`Meals`JOIN `Dining_Hall_Tracker`.`Macros`)WHERE(`Dining_Hall_Tracker`.`Meals`.`meal_id` = `Dining_Hall_Tracker`.`Macros`.`meal_id`)';
//router.get('/table/data', async (req, res) => {
 // try {
 //   const result = await db.sequelizeDB.query(macrosCustom, {
 //     type: sequelize.QueryTypes.SELECT
 //   });
 //   res.json(result);
 // } catch (err) {
 //   console.error(err);
 //   res.error('Server error');
 // }
//});

// const mealMapCustom = `SELECT hall_name,
//  hall_address,
//  hall_lat,
//  hall_long,
//  meal_name
//FROM
 // Meals m
//INNER JOIN Meals_Locations ml 
//  ON m.meal_id = ml.meal_id
//INNER JOIN Dining_Hall d
//ON d.hall_id = ml.hall_id;`;
//router.get('/map/data', async (req, res) => {
//  try {
 //   const result = await db.sequelizeDB.query(mealMapCustom, {
     // type: sequelize.QueryTypes.SELECT
   // });
  //  res.json(result);
 // } catch (err) {
 //   console.error(err);
 //   res.error('Server error');
 // }
//});
//router.get('/custom', async (req, res) => {
  //try {
    //const result = await db.sequelizeDB.query(req.body.query, {
      //type: sequelize.QueryTypes.SELECT
   // });
   // res.json(result);
  //} catch (err) {
   // console.error(err);
   // res.error('Server error');
 // }
//});

export default router;
