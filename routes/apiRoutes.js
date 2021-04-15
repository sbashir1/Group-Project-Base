/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';
import Awards from '../models/Awards.js';

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
router.get('/rest_monu', async (req, res) => {
  try {
    const restMonu = await db.rest_monu.findAll();
    res.json(rest_monu);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/rest_monu/:restaurant_id', async (req, res) => {
  try {
    const restMonu = await db.rest_monu.findAll({
      where: {
        restaurant_id: req.params.restaurant_id
      }
    });
    res.json(restMonu);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post("/rest_monu", async (req, res) => {
  const currentId = (await rests.length) + 1;
  try {
    const newRestMonu = await db.rest_monu.create({
      restaurant_id: currentId,
      monument_id: req.body.monument_id,
      distance_apart: req.body.distance_apart,
    });
    res.json(newRestMonu);
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

router.put('/rest_monu', async (req, res) => {
  try {
    await db.rest_monu.update(
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

router.delete("/rest_monu/:restaurant_id", async (req, res) => {
  try {
    await db.rest_monu.destroy({
      where: {
        restaurant_id: req.params.restaurant_id,
      },
    });
    res.send("Successfully Deleted");
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

/// ///////////////////////////////////
/// ////////Monument Endpoints/////////
/// //////////////////////////////////
router.get('/monuments', async (req, res) => {
  try {
    const monuments = await db.monuments.findAll();
    //res.send(monuments);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/monuments/:Monument_ID', async (req, res) => {
  try {
    const monuments_a = await db.monuments.findAll({
      where: {
        Monument_ID: req.params.Monument_ID
      }
    });
    res.json(monuments_a);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post("/monuments", async (req, res) => {
  const monuments = await db.Rest.findAll();
  const currentId = (await monuments.length)+1;
  try {
    const newMonument = await db.monuments.create({
      Monument_ID: currentId,
      Monument_address: req.body.Monument_address,
      Monument_name: req.body.Monument_name,
      Monument_zip: req.body.Monument_zip,
    });
    res.json(newMonument);
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

router.put('/monuments', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.monuments.update(
      {
        Monument_address: req.body.Monument_address,
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

router.delete("/monuments/:Monument_ID", async (req, res) => {
  try {
    await db.monuments.destroy({
      where: {
        Monument_ID: req.params.Monument_ID,
      },
    });
    res.send("Successfully Deleted");
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

/// /////////////////////////////////
/// Restaurants Awards Endpoints/////
/// /////////////////////////////////
router.get('/restaurant_award', async (req, res) => {
  try {
    const rest_awards = await db.restaurant_award.findAll();
    res.json(rest_awards);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/restaurant_award/:restaurant_id', async (req, res) => {
  try {
    const rest_awards = await db.restaurant_award.findAll({
      where: {
        restaurant_id: req.params.restaurant_id
      }
    });
    res.json(rest_awards);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.post('/restaurant_award', async (req, res) => {
  try {
    await db.restaurant_award.update(
      {
        award_id: req.body.award_id
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

/// ////////////////////////////////////////////
/// ////////////Awards Endpoints///////////////
/// //////////////////////////////////////////
router.get('/Awards', async (req, res) => {
  try {
    const awards = await db.Awards.findAll();
    res.json(awards);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/Awards/:award_id', async (req, res) => {
  try {
    const awards = await db.Awards.findAll({
      where: {
        Awards_ID: req.params.Awards_ID
      }
    });
    res.json(awards);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/Awards', async (req, res) => {
  try {
    await db.Awards.update(
      {
        Awards_ID: req.body.Awards_ID,
        Award_name: req.body.Award_name,
      },
      {
        where: {
          Awards_ID: req.body.Awards_ID
        }
      }
    );
    res.send('Successfully Updated');
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

router.post("/Rest_Chef", async (req, res) => {
  try {
    const newRestChef = await db.Rest_Chef.create({
      restaurant_id: req.body.restaurant_id,
      chef_id: req.body.chef_id,
    });
    res.json(newRestChef);
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

router.put("/Rest_Chef", async (req, res) => {
  try {
    await db.Rest_Chef.update(
      {
        chef_id: req.body.chef_id,
      },
      {
        where: {
          restaurant_id: req.body.restaurant_id,
        },
      }
    );
    res.send("Successfully Updated");
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

router.delete("/Rest_Chef/:restaurant_id", async (req, res) => {
  try {
    await db.Rest_Chef.destroy({
      where: {
        restaurant_id: req.params.restaurant_id,
      },
    });
    res.send("Successfully Deleted");
  } catch (err) {
    console.error(err);
    res.error("Server error");
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

router.post("/Chefs", async (req, res) => {
  try {
    const newChef = await db.Chefs.create({
      Chef_ID: req.body.Chef_ID,
      Chef_fn: req.body.Chef_fn,
      Chef_ln: req.body.Chef_ln,
    });
    res.json(newChef);
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

router.put("/Chefs", async (req, res) => {
  try {
    await db.Chefs.update(
      {
        Chef_fn: req.body.Chef_fn,
        Chef_ln: req.body.Chef_ln
      },
      {
        where: {
          Chef_ID: req.body.Chef_ID
        },
      }
    );
    res.send("Successfully Updated");
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

router.delete("/Chefs/:Chef_ID", async (req, res) => {
  try {
    await db.Chefs.destroy({
      where: {
        Chef_ID: req.params.Chef_ID,
      },
    });
    res.send("Successfully Deleted");
  } catch (err) {
    console.error(err);
    res.error("Server error");
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
