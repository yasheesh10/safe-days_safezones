import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const TrustedContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchContacts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("trusted_contacts")
      .select("*")
      .eq("user_id", user.id);

    setContacts(data || []);
  };

const addContact = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("USER ID:", user?.id);

  if (!name || !email) return;

  const payload = {
    user_id: user?.id,
    name,
    email,
  };

  console.log("INSERT PAYLOAD:", payload);

  const { data, error } = await supabase
    .from("trusted_contacts")
    .insert(payload);

  console.log("INSERT ERROR:", error);
  console.log("INSERT DATA:", data);

  if (error) {
    alert("Insert failed: " + error.message);
    return;
  }

  setName("");
  setEmail("");

  fetchContacts();
};

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="space-y-4">

      <h2 className="text-lg font-bold">Trusted Contacts</h2>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Email"
          value={email}
onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={addContact}>Add</Button>
      </div>

      {contacts.map((c) => (
        <div key={c.id} className="border p-2 rounded">
          {c.name} — {c.email}
        </div>
      ))}
    </div>
  );
};

export default TrustedContacts;
