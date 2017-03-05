/**
 * Created by KIMSEONHO then 2017-03-02.
 */
/*
 Title: Working with associations

 This example demonstrates the use of associations.
 First of all, Person is getting associated via many-to-many with other Person objects (e.g. Person.hasMany('brothers')).
 Afterwards a Person becomes associated with a 'father' and a mother using a one-to-one association created by hasOneAndBelongsTo.
 The last association has the type many-to-one and is defined by the function hasManyAndBelongsTo.
 The rest of the example is about setting and getting the associated data.
 */

var Sequelize = require('sequelize'),
   config    = require('../../config/main'),
   sequelize = new Sequelize(config.database, config.username, config.password, config),
   Person    = sequelize.define('Person', {
      id: {
         type: Sequelize.INTEGER(11),
         primaryKey: true,
         autoIncrement: true
      },
      name: Sequelize.INTEGER(11)
      // BrotherId: Sequelize.INTEGER(11),
      // SisterId: Sequelize.INTEGER(11),
      // FatherId: Sequelize.INTEGER(11),
      // MotherId: Sequelize.INTEGER(11),
      // PetId: Sequelize.INTEGER(11)
   }),
   Pet       = sequelize.define('Pet',    {
      id: {
         type: Sequelize.INTEGER(11),
         primaryKey: true,
         autoIncrement: true
      }, name: Sequelize.STRING });

Person.hasMany(Person, {as: 'Brothers', foreignKey: 'BrotherId', sourceKey: "id",
   onUpdate: "CASCADE", onDelete: "CASCADE"/*, constraints: false*/})
Person.hasMany(Person, {as: 'Sisters', foreignKey: 'SisterId', sourceKey: "id",
   onUpdate: "CASCADE", onDelete: "CASCADE"/*, constraints: false*/})
Person.hasOne(Person, {as: 'Father', foreignKey: 'FatherId', sourceKey: "id",
   onUpdate: "CASCADE", onDelete: "CASCADE"/*, constraints: false*/})
Person.hasOne(Person, {as: 'Mother', foreignKey: 'MotherId', sourceKey: "id",
   onUpdate: "CASCADE", onDelete: "CASCADE"/*, constraints: false*/})
Person.hasMany(Pet, {foreignKey: 'PetId', sourceKey: "id",
   onUpdate: "CASCADE", onDelete: "CASCADE"/*, constraints: false*/})


sequelize.sync({force:true}).then(function() {

   var person  = Person.build({ id: 1, name: 'Luke', a: "123123"})
   var mother  = Person.build({ id: 2, name: 'Jane'})
   var father  = Person.build({ id: 3, name: 'John'})

   var brother1 = Person.build({ id: 4, name: 'bro1' })
   var brother2 = Person.build({ id: 5, name: 'Bro2' })
   var brother3 = Person.build({ id: 6, name: 'Bro3' })

   var sister1  = Person.build({ id: 7, name: 'Sis1' })
   var sister2  = Person.build({ id: 8, name: 'Sis2' })
   var sister3  = Person.build({ id: 9, name: 'Sis3' })

   var pet1     = Pet.build({ id: 1, name: 'Bob' })
   var pet2     = Pet.build({ id: 2, name: 'Sam' })
   var pet3     = Pet.build({ id: 3, name: 'Dark' })

   return Sequelize.Promise.all([
      person.save(), // mother.save(), father.save(),
      brother1.save(), brother2.save(), brother3.save(),
      sister1.save(), sister2.save(), sister3.save(),
      pet1.save(), pet2.save(), pet3.save()]).then((result1, result2) => {

      console.log('\n save End \n');

      Person.bulkCreate([{ id: 11, name: 'Bob11' }, { id: 12, name: 'Bob12' }]).then(result => {
         console.log('bulkCreate result: ', result)      // <- 생성된 instance(mother)을 return함
      });

      return person.setMother(mother).then(function (result) {
         // console.log('setMother result: ', result) <- 생성된 instance(mother)을 return함

         return person.getMother().then(function (mom) {
            console.log('my mom: ', mom.name)
         })
      }).then(() => {
         return person.setFather(father).then(function (result) {
            // console.log('setFather result: ', result) <- 생성된 instance(father)을 return함

            return person.getFather().then(function (dad) {
               console.log('my dad: ', dad.name)
            })
         })


      // return person.createMother({     // 오류 : Father가 삽입되지 않는다
      //    id: 2, name: 'Jane',
      //    Person: {
      //       id: 3, name: 'John', FatherId: 1
      //    }
      // }, {
      //    include: [{
      //       model: Person,
      //       as: "Father"
      //    }]
      // }).then(function (result1, result2) {     // <- instance(mother)값 리턴됨
            console.log('setMother result: ', result1);      // <- 생성된 instance(mother)을 return함

         return person.getFather().then(function (dad) {
            //          console.log('my dad: ', dad.name)
            //       })
            return person.getMother().then(function (mom) {
               console.log('my mom: ', mom.name)
            })
         })
      }).then(() => {
         return person.addBrothers([brother1, brother2, brother3]).then(function (result) {
            console.log('addBrothers result: ', result.name);     // <- 자기 자신(person)을 return함
            result.hasBrother(brother1).then(result => {

               console.log('hasBrothers(brother1) result: ', result);
            })

            return person.getBrothers().then(function (brothers) {
               console.log("my brothers: " + brothers.map(function (b) {
                     return b.name
                  }))
            })
         })
      }).then(() => {
         return person.setSisters([sister1, sister2, sister3]).then(function (result) {
            // console.log('setSisters result: ', result)
            result.hasSister(sister1).then(result => {

               console.log('hasSister(sister1) result: ', result);
            })

            return person.getSisters().then(function (sisters) {
               console.log("my sisters: " + sisters.map(
                     function (s) {
                        return s.name
                     }))
            })
         })
      }).then(() => {
         return person.setSisters([sister3]).then(function (result) {
            // console.log('setSisters result: ', result)
            result.hasSister(sister1).then(result => {

               console.log('hasSister(sister1) result: ', result);
            })

            return person.getSisters().then(function (sisters) {
               console.log("my sisters: " + sisters.map(
                     function (s) {
                        return s.name
                     }))
            })
         })
      }).then(() => {
         return person.addPets([pet1, pet2]).then(function (result) {
            // console.log('setPets result: ', result)
            result.hasPet(pet1).then(result => {

               console.log('hasPet(pet1) result: ', result);
            })

            return person.getPets().then(function (pets) {
               console.log("my pets: " + pets.map(function (p) {
                     return p.name
                  }))
            })
         }).then(() => {
            return person.setPets([pet2]).then(function (result) {

               return person.getPets().then(function (pets) {
                  console.log("my pets: " + pets.map(function (p) {
                        return p.name
                     }))
               })
            })
         })
      })
   })
}).catch(err => {
   console.log(err);
})
