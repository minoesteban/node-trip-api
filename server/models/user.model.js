'use strict';
const Sequelize = require('sequelize').Sequelize;
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Sequelize.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.ownedTrips = this.hasMany(models.Trip, {
                foreignKey: 'owner_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    User.init({
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            //es autoincrement en PSQL. no insertar
        },
        username: {
            type: Sequelize.STRING,
            field: 'username',
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            field: 'password',
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING,
            field: 'first_name',
            allowNull: true,
        },
        lastName: {
            type: Sequelize.STRING,
            field: 'last_name',
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            field: 'active',
            defaultValue: 1,
            allowNull: false,
        },
        about: {
            type: Sequelize.STRING,
            field: 'about',
            allowNull: true,
        },
        languageId1: {
            type: Sequelize.STRING(2),
            field: 'language_id_1',
            allowNull: true,
        },
        languageId2: {
            type: Sequelize.STRING(2),
            field: 'language_id_2',
            allowNull: true,
        },
        languageId3: {
            type: Sequelize.STRING(2),
            field: 'language_id_3',
            allowNull: true,
        },
        languageId4: {
            type: Sequelize.STRING(2),
            field: 'language_id_4',
            allowNull: true,
        },
        languageId5: {
            type: Sequelize.STRING(2),
            field: 'language_id_5',
            allowNull: true,
        },
        onlyNearest: {
            type: Sequelize.BOOLEAN,
            field: 'only_nearest',
            defaultValue: 0,
            allowNull: true,
        },
        onlyFavourites: {
            type: Sequelize.BOOLEAN,
            field: 'only_favourites',
            defaultValue: 0,
            allowNull: true,
        },
        onlyPurchased: {
            type: Sequelize.BOOLEAN,
            field: 'only_purchased',
            defaultValue: 0,
            allowNull: true,
        },
        favouriteTrips: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            field: 'favourite_trips',
            allowNull: true,
        },
        favouritePlaces: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            field: 'favourite_places',
            allowNull: true,
        },
        purchasedTrips: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            field: 'purchased_trips',
            allowNull: true,
        },
        purchasedPlaces: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            field: 'purchased_places',
            allowNull: true,
        },
        downloadedTrips: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            field: 'downloaded_trips',
            allowNull: true,
        },
        downloadedPlaces: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            field: 'downloaded_places',
            allowNull: true,
        },
    }, {
        schema: 'public',
        tableName: 'user',
        sequelize,
        modelName: 'User',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
        hooks: {
            beforeCreate: async function(user) {
                const salt = await bcrypt.genSaltSync();
                user.password = await bcrypt.hashSync(user.password, salt);
            },
        },
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        },
    });

    User.prototype.validPassword = async function(password) {
        return await bcrypt.compareSync(password, this.password);
    };

    return User;
};