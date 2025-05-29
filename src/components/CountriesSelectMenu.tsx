import { Select } from "@radix-ui/themes";
import { useState } from "react";
import type {Country} from "../models/models.ts";
import {useTranslation} from "react-i18next";

type CountriesSelectMenuProps = {
    countriesList: Country[];
    getSelectedCountry: (countryName: string) => void;
}

export function CountriesSelectMenu({countriesList, getSelectedCountry}: CountriesSelectMenuProps) {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCountryEmoji, setSelectedCountryEmoji] = useState<string | null>(null);
    const { t } = useTranslation();

    return (
        <>
            <div>
                <Select.Root defaultValue="none"
                             onValueChange={(value) => {
                                 setSelectedCountry(value);
                                 getSelectedCountry(value);
                                 const selected = countriesList.find(obj => obj.country === value);
                                 if (selected) {
                                     setSelectedCountryEmoji(selected.emoji)
                                 }
                             }}
                >
                    <Select.Trigger value={selectedCountry as string} radius="medium" variant="soft">
                        {selectedCountry ? (
                            <span className="truncate flex items-center">
                                    <span className="me-2 scale-125">{selectedCountryEmoji}</span>
                                    <span className="">{selectedCountry}</span>
                                </span>
                        ) : <span>{t("searchCountryPlaceholder")}</span>}
                    </Select.Trigger>
                    <Select.Content position="popper" className="max-h-[200px] md:max-h-full overflow-y-auto">
                        {countriesList && countriesList.length > 0 ? (
                            countriesList.map((obj, i) => (
                                <Select.Item key={i} value={obj.country} data-emoji={obj.emoji}>
                                    <span className="truncate flex items-center">
                                        <span className="me-2 scale-125">{obj.emoji}</span>
                                        <span>{obj.country}</span>
                                    </span>
                                </Select.Item>
                            ))
                        ) : (
                            <div className="text-center">
                                <span className="text-gray-400 px-2 py-2">Select region at first...</span>
                            </div>
                        )}
                    </Select.Content>
                </Select.Root>
            </div>
        </>
    )
}
