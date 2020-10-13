'use strict';
const Sequelize = require('sequelize').Sequelize;
var bcrypt = require('bcryptjs');

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
        imageUrl: {
            type: Sequelize.STRING,
            field: 'image_url',
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            field: 'active',
            defaultValue: 0,
            allowNull: false,
        },
        isGuide: {
            type: Sequelize.BOOLEAN,
            field: 'is_guide',
            defaultValue: 0,
            allowNull: false,
        },
        about: {
            type: Sequelize.STRING,
            field: 'about',
            allowNull: true,
        },
        pin: {
            type: Sequelize.INTEGER,
            field: 'pin',
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
        selectedLanguages: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            field: 'selected_languages',
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
            attributes: { exclude: ['password', 'pin'] },
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