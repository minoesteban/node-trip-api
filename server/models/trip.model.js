'use strict';
const Sequelize = require('sequelize').Sequelize;

module.exports = (sequelize, DataTypes) => {
    class Trip extends Sequelize.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.owner = this.belongsTo(models.User, {
                foreignKey: 'owner_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });

            this.places = this.hasMany(models.Place, {
                foreignKey: 'trip_id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE',
            });

            this.places = this.hasMany(models.Purchase, {
                foreignKey: 'trip_id',
            });

            this.ratings = this.hasMany(models.Rating, {
                foreignKey: 'trip_id',
            });
        }
    }
    Trip.init({
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            //es autoincrement en PSQL. no insertar
        },
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: true,
        },
        ownerId: {
            type: Sequelize.INTEGER,
            field: 'owner_id',
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        googlePlaceId: {
            type: Sequelize.STRING,
            field: 'google_place_id',
            allowNull: true,
        },
        locationName: {
            type: Sequelize.STRING,
            field: 'location_name',
            allowNull: true,
        },
        countryId: {
            type: Sequelize.STRING(3),
            field: 'country_id',
            allowNull: true,
        },
        previewAudioUrl: {
            type: Sequelize.STRING,
            field: 'preview_audio_url',
            allowNull: true,
        },
        languageNameId: {
            type: Sequelize.STRING,
            field: 'language_name_id',
            allowNull: true,
        },
        languageFlagId: {
            type: Sequelize.STRING,
            field: 'language_flag_id',
            allowNull: true,
        },
        price: {
            type: Sequelize.FLOAT(53),
            field: 'price',
            allowNull: true,
        },
        about: {
            type: Sequelize.STRING,
            field: 'about',
            allowNull: true,
        },
        submitted: {
            type: Sequelize.BOOLEAN,
            field: 'submitted',
            defaultValue: false,
            allowNull: false,
        },
        published: {
            type: Sequelize.BOOLEAN,
            field: 'published',
            defaultValue: false,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
            field: 'image_url',
            allowNull: true,
        },
    }, {
        sequelize,
        schema: 'public',
        tableName: 'trip',
        modelName: 'Trip',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
    });
    return Trip;
};