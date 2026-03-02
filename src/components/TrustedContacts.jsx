import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const TrustedContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

    if (!name || !phone) return;

    await supabase.from("trusted_contacts").insert({
      user_id: user.id,
      name,
      phone,
    });

    setName("");
    setPhone("");
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button onClick={addContact}>Add</Button>
      </div>

      {contacts.map((c) => (
        <div key={c.id} className="border p-2 rounded">
          {c.name} — {c.phone}
        </div>
      ))}
    </div>
  );
};

export default TrustedContacts;
