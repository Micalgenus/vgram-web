"use strict";

const models = require('../../models');
const Coordinate = models.coordinate;
const Post = models.post;
const User = models.user;
const Room = models.room;
const Translation = models.icl_translation;

exports.getRoomLocations = function(req, res) {
  let east = req.params.east;
  let west = req.params.west;
  let south = req.params.south;
  let north = req.params.north;

  return Coordinate.findAll({
    include: [ {
      model: Translation,
      required: true,
      attributes: ['group_id'],
      include: [ {
        model: Post,
        required: true,
        attributes: ['ID'],
        include: [ {
          model: Room,
          required: true,
          attributes: ['ID']
        } ],
      } ],
    } ],
    where: {
      lat: {
        $and: {
          $lt: north,
          $gt: south
        }
      },
      lng: {
        $and: {
          $lt: east,
          $gt: west
        }
      }
    },
    attributes: ['ID', 'lat', 'lng']
  }).then(function(locations) {
    return res.send(locations);
  });
}