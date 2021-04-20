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
router.get('/rest', async (req, res) => {
  try {
    const rests = await db.rest.findAll();
    const reply = rests.length > 0 ? { data: rests } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/rest/:restaurantID', async (req, res) => {
  try {
    const getrest = await db.rest.findAll({
      where: {
        restaurant_id: req.params.restaurant_id
      }
    });
    res.json(getrest);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/rest', async (req, res) => {
  const rests = await db.rest.findAll();
  const currentId = (await rests.length) + 1;
  try {
    const newRest = await db.rest.create({
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


router.put('/rest', async (req, res) => {
  try {
    await db.rest.update(
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

  router.delete('/rest/:foodID', async (req, res) => {
    try {
      await db.rest.destroy({
        where: {
          food_id: req.params.food_id
        }
      });
      res.send('Successfully Deleted');
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
    const restMonu = await db.Rest_Monu.findAll(); 
    res.json(restMonu);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/rest_monu/:restaurant_id', async (req, res) => {
  try {
    const restMonu = await db.Rest_Monu.findAll({
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
    const newRestMonu = await db.Rest_Monu.create({
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
    await db.Rest_Monu.update(
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
    await db.Rest_Monu.destroy({
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
router.get('/monu', async (req, res) => {
  try {
    const monuments = await db.Monu.findAll();
    res.send(monuments);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/monu/:Monument_ID', async (req, res) => {
  try {
    const monuments_a = await db.Monu.findAll({
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

router.post("/monu", async (req, res) => {
  const monuments = await db.Monu.findAll();
  const currentId = (await monuments.length)+1;
  try {
    const newMonument = await db.Monu.create({
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

router.put('/monu', async (req, res) => {
  try {
    // N.B. - this is a good example of where to use code validation to confirm objects
    await db.Monu.update(
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

router.delete("/monu/:Monument_ID", async (req, res) => {
  try {
    await db.Monu.destroy({
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

router.post("/Food", async (req, res) => {
  try {
    const newFood = await db.Food.create({
      food_id: req.body.food_id,
    });
    res.json(newFood);
  } catch (err) {
    console.error(err);
    res.error("Server error");
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

router.delete("/Food/:food_id", async (req, res) => {
  try {
    await db.Food.destroy({
      where: {
        food_id: req.params.food_id,
      },
    });
    res.send("Successfully Deleted");
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});


/// ////////////////////////////////////////////
/// ////////Restaurant Chefs Endpoints//////////
/// //////////////////////////////////////////

router.get('/restChef', async (req, res) => {
  try {
    const restChef = await db.RestChef.findAll();
    res.json(restChef);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/restChef/:restaurant_id', async (req, res) => {
  try {
    const restChef = await db.RestChef.findAll({
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

router.post("/restChef", async (req, res) => {
  try {
    const newRestChef = await db.RestChef.create({
      restaurant_id: req.body.restaurant_id,
      chef_id: req.body.chef_id,
    });
    res.json(newRestChef);
  } catch (err) {
    console.error(err);
    res.error("Server error");
  }
});

router.put("/restChef", async (req, res) => {
  try {
    await db.RestChef.update(
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

router.delete("/restChef/:restaurant_id", async (req, res) => {
  try {
    await db.RestChef.destroy({
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
    const Chef = await db.Chefs.findAll();
    res.json(Chef);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/Chefs/:Chef_ID', async (req, res) => {
  try {
    const Chef = await db.Chefs.findAll({
      where: {
        Chef_ID: req.params.Chef_ID
      }
    });
    res.json(Chef);
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
