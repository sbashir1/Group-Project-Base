/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Restaurants and Monuments!');
});

/// /////////////////////////////////
/// ////Restaurant Endpoints////////
/// /////////////////////////////////
router.get('/Rest', async (req, res) => {
  try {
    const rests = await db.Rest.findAll();
    const reply = rests.length > 0 ? { data: rests } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/Rest/:restaurant_id', async (req, res) => {
  try {
    const rest = await db.Rest.findAll({
      where: {
        restaurant_id: req.params.restaurant_id
      }
    });
    res.json(rest);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/Rest', async (req, res) => {
  const rests = await db.Rest.findAll();
  const currentId = (await rests.length) + 1;
  try {
    const newRest = await db.Rest.create({
      restaurant_id: currentId,
      food_id: currentId,
      restaurent_name: req.body.restaurent_name,
      restaurant_street: req.body.restaurant_street,
      restaurant_zip: req.body.restaurant_zip,
      restaurant_town: req.body.restaurant_town,
      restaurant_phone: req.body.restaurant_phone,
      restaurant_email: req.body.restaurant_email
      
    });
    res.json(newRest);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

// router.delete('/dining/:hall_id', async (req, res) => {
//   try {
//     await db.DiningHall.destroy({
//       where: {
//         hall_id: req.params.hall_id
//       }
//     });
//     res.send('Successfully Deleted');
//   } catch (err) {
//     console.error(err);
//     res.error('Server error');
//   }
// });

router.put('/Rest', async (req, res) => {
  try {
    await db.Rest.update(
      {
        restaurent_name: req.body.restaurent_name,
        restaurant_street: req.body.restaurant_street,
        restaurant_zip: req.body.restaurant_zip,
        restaurant_town: req.body.restaurant_town,
        restaurant_phone: req.body.restaurant_phone,
        restaurant_email: req.body.restaurant_email
      },
      {
        where: {
          restaurant_id: req.body.restaurant_id
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
router.get('/restaurant_monuments', async (req, res) => {
  try {
    const rest_monu = await db.restaurant_monuments.findAll();
    res.json(restaurant_monuments);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/restaurant_monuments/:restaurant_id', async (req, res) => {
  try {
    const rest_monuments = await db.restaurant_monuments.findAll({
      where: {
        restaurant_id: req.params.restaurant_id
      }
    });
    res.json(restaurant_monuments);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/restaurant_monuments', async (req, res) => {
  try {
    await db.restaurant_monuments.update(
      {
        monument_id: req.body.monument_id,
        distance_apart: req.body.distance_apart
      },
      {
        where: {
          restaurant_id: req.body.restaurant_id
        }
      }
    );
    res.send('Restuarant and Monument Distance Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// ///////////////////////////////////
/// ////////Monument Endpoints/////////
/// //////////////////////////////////
router.get('/Monuments', async (req, res) => {
  try {
    const monument = await db.Monuments.findAll();
    res.send(monument);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/Monuments/:Monument_ID', async (req, res) => {
  try {
    const monument_id = await db.Monuments.findAll({
      where: {
        Monument_ID: req.params.Monument_ID
      }
    });
    res.json(Monuments);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/Monuments', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.Monuments.update(
      {
        Monument_address: req.body.Monument_adress,
        Monument_name: req.body.Monument_name,
        Monument_zip: req.body.Monument_zip,
      },
      {
        where: {
          Monument_ID: req.body.Monument_ID
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

router.get('/rest_award', async (req, res) => {
  try {
    const rest_awards = await db.restaurantsandmonuments.findAll();
    const reply = rest_awards.length > 0 ? { data: rest_awards } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.post('/rest_award', async (req, res) => {
  const rest_awards = await db.restaurantsandmonuments.findAll();
  const currentId = (await rest_awards.length) + 1;
  try {
    const newAwards = await db.restaurantsandmonuments.create({
      restaurant_id: currentId,
      award_id: currentId,
      years_won: req.body.years_won,
      star_rating: req.body.star_rating,
    });
    res.json(newAwards);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// ////////////////////////////////////////////
/// ////////////Awards Endpoints///////////////
/// //////////////////////////////////////////
router.get('/awards', async (req, res) => {
  try {
    const awards = await db.restaurantsandmonuments.findAll();
    const reply = awards.length > 0 ? { data: awards } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/awards/:award_id', async (req, res) => {
  try {
    const award = await db.restaurantsandmonuments.findAll({
      where: {
        award_id: req.params.award_id
      }
    });

    res.json(award);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.post('/awards', async (req, res) => {
  const awards = await db.restaurantsandmonuments.findAll();
  const currentId = (await awards.length) + 1;
  try {
    const newAwards = await db.restaurantsandmonuments.create({
      award_id: currentId,
      award_name: req.body.award_name,
    });
    res.json(newAwards);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/awards/:award_id', async (req, res) => {
  const awards = await db.restaurantsandmonuments.findAll();
  const currentId = (await awards.length) + 1;
  try {
    const newAwards = await db.restaurantsandmonuments.create({
      award_id: currentId,
      award_name: req.body.award_name,
    });
    res.json(newAwards);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});


/// ///////////////////////////////////
/// /////////Food Endpoints////////////
/// //////////////////////////////////

router.get('/Food', async (req, res) => {
  try {
    const food = await db.Food.findAll();
    res.json(food);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/Food/:food_id', async (req, res) => {
  try {
    const food = await db.Food.findAll({
      where: {
        food_id: req.params.food_id
      }
    });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/Food', async (req, res) => {
  try {
    await db.Food.update(
      {
        food_type: req.body.food_type,
      },
      {
        where: {
          food_id: req.body.food_id
        }
      }
    );
    res.send('Food Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});


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
