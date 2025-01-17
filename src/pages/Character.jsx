import axios from "axios";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect } from "react";
import "./character.css";
import Tooltip from "../components/Tooltip";

function Character() {
  const { user, setUser } = useContext(AuthContext);
  const gearOrder = [
    "trinket",
    "helmet",
    "gloves",
    "chest",
    "boots",
    "pants",
    "weapon",
    "shield",
  ];
  //handle the equip item action

  const handleEquip = async (itemId) => {
    try {
      const res = await axios.get(
        `${API_URL}/equip?characterId=${user.character._id}&itemId=${itemId}`
      );
      const data = res.data;
      setUser({ ...user, character: data });
    } catch (error) {
      console.log(error);
    }
  };

  //handle the unequip item action
  const handleUnequip = async (itemId) => {
    try {
      const res = await axios.get(
        `${API_URL}/unequip?characterId=${user.character._id}&itemId=${itemId}`
      );
      const data = res.data;
      setUser({ ...user, character: data });
    } catch (error) {
      console.log(error);
    }
  };

  //handle the use consumable action
  const handleUseConsumable = async (consumableId) => {
    try {
      const res = await axios.get(
        `${API_URL}/useConsumable?characterId=${user.character._id}&consumableId=${consumableId}`
      );
      const data = res.data;
      setUser({ ...user, character: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [user]);

  return user.character.attributes && user.character ? (
    <div className="character">
      <h1 className="characterName">{user.character.name}</h1>
      <div className="characterTop">
        <div className="characterInfo">
          <img
            className="characterImg"
            src={user.character.image}
            alt={user.character.name}
            style={{ width: "10rem" }}
          />
          <div className="characterStats">
            <h4>
              Damage:{" "}
              {Math.round(
                user.character.damage *
                  1.1 ** user.character.attributes.strength
              )}
            </h4>
            <h4>
              Armor:{" "}
              {Math.round(
                user.character.attributes.armor *
                  1.05 ** user.character.attributes.constitution
              )}
            </h4>
            <h4>Strength: {user.character.attributes.strength}</h4>
            <h4>Dexterity: {user.character.attributes.dexterity}</h4>
            <h4>Agility: {user.character.attributes.agility}</h4>
            <h4>Constitution: {user.character.attributes.constitution}</h4>
            {/* <h4>Fate: {user.character.attributes.fate}</h4> */}
          </div>
        </div>

        <div className="characterGear">
          {gearOrder.map((type) => {
            const gearItems = user.character.gear.find(
              (item) => item.type === type
            );
            return (
              <div key={type}>
                {gearItems ? (
                  // <img className= "gearImg" src={gearItems.image} alt={type} onClick={() => handleUnequip(gearItems._id)}/>
                  <Tooltip
                    item={gearItems}
                    handleButton={handleUnequip}
                    buttomText="Unequip"
                    className="gearImg"
                    key={gearItems._id}
                  />
                ) : (
                  <img
                    className="gearImg"
                    src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699913631/game/UI%20elements/frame_c2_02_nqfzrg.png"
                    alt={type}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <h4>Inventory</h4>
      <div className="characterInventory">
        {user.character.inventory && user.character.inventory.length > 0 ? (
          user.character.inventory.map((item) => (
            <Tooltip
              item={item}
              handleButton={handleEquip}
              buttomText="Equip"
              className="inventoryItemImg"
              key={crypto.randomUUID()}
            />
          ))
        ) : (
          <p>No items in inventory</p>
        )}
      </div>

      <h4>Consumables</h4>
      <div className="characterConsumables">
        {user.character.consumables && user.character.consumables.length > 0 ? (
          user.character.consumables.map((consumable) => (
            <Tooltip
              item={consumable}
              handleButton={handleUseConsumable}
              buttomText="Use"
              className="consumablesItemImg"
              key={crypto.randomUUID()}
            />
          ))
        ) : (
          <p>No consumables available</p>
        )}
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default Character;
