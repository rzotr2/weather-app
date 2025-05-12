import { Select } from "@radix-ui/themes";
import {useEffect, useState} from "react";
import countries from "../data/countries.ts";

type Country = {
    title: string;
    value: string;
}

type CountriesSelectMenuProps = {
    getSelectedCountry: (value: string, selectedCountryCode: string) => void;
}

export function CountriesSelectMenu({getSelectedCountry}: CountriesSelectMenuProps) {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
    const countriesList: Country[] = countries;

    useEffect(() => {
        if (!selectedCountry) {
            setSelectedCountryCode(null);
            return;
        }
        const found = countriesList.find(obj => obj.title === selectedCountry);
        setSelectedCountryCode(found ? found.value : null);
    }, [selectedCountry, countriesList]);

    return (
        <>
            <div>
                <Select.Root defaultValue="apple"
                             onValueChange={(value) => {
                                 setSelectedCountry(value);
                                 getSelectedCountry(value, selectedCountryCode as string);
                             }}
                >
                    <Select.Trigger value={selectedCountry as string} radius="medium" variant="soft">
                        {selectedCountry ? (
                            <span className="truncate flex items-center">
                                    <img alt={`${selectedCountry} flag`}
                                         src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountryCode}.svg`}
                                         className={"inline mr-1 h-3 rounded-sm"}
                                    />
                                {selectedCountry}
                                </span>
                        ) : <span>Select a country...</span>}
                    </Select.Trigger>
                    <Select.Content position="popper" className="max-h-[200px] md:max-h-full overflow-y-auto">
                        {countriesList.map((obj, i) => (
                            <Select.Item key={i} value={obj.title}>
                                <span className="truncate flex items-center">
                                    <img alt={`${obj.value} flag`}
                                         src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${obj.value}.svg`}
                                            className={"inline mr-1 h-3 rounded-sm"}
                                    />
                                    {obj.title}
                                </span>
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>

            </div>
        </>
    )
}
