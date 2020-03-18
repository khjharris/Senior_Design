import tensorflow as tf
import data
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from keras.models import Model, load_model
from keras.layers import Input, Dense
from keras.callbacks import ModelCheckpoint, TensorBoard
from keras import regularizers


def create_autoencoder():
    input_dim = 18
    encoding_dim = 14

    input_layer = Input(shape=(input_dim, ))
    encoder = Dense(encoding_dim, activation="tanh",
                    activity_regularizer=regularizers.l1(10e-5))(input_layer)
    encoder = Dense(int(encoding_dim / 2), activation="relu")(encoder)
    decoder = Dense(int(encoding_dim / 2), activation='tanh')(encoder)
    decoder = Dense(input_dim, activation='relu')(decoder)

    autoencoder = Model(inputs=input_layer, outputs=decoder)

    autoencoder.compile(optimizer='adam',
                        loss='mean_squared_error',
                        metrics=['accuracy'])

    return autoencoder


def train_autoencoder(data, model_id):

    # Making autoencoder
    autoencoder = create_autoencoder()

    # Training autoencoder
    autoencoder.fit(X_train, X_train, epochs=20)

    # Saving autoencoder
    autoencoder.save("models/autoencoders/model_%s.json" % model_id)


def getLoss(data, model_id):
    # Loading Model
    autoencoder = tf.keras.models.load_model(
        'models/autoencoders/model_%s.json' % model_id)

    # Getting loss
    loss = autoencoder.evaluate(data, data, verbose=False)[0]

    return loss


if __name__ == "__main__":

    X_train, X_test = train_test_split(
        data.data, test_size=0.2, random_state=0)

    train_autoencoder(X_train, "javi")

    print("PRO LOSS: ")
    print(getLoss(X_test, "javi"))

    print("AMATUER LOSS: ")
    print(getLoss(data.badDataPoint_x, "javi"))
