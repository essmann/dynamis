import { sharedStyles } from "@dynamis/shared";
import {

    Text,
    StyleProp,
    TextStyle,
} from "react-native";

export default function ThemedText({
    style,
    children,
}: {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
}) {

    return (
        <Text
            style={[
                {
                    fontFamily: "Inter",
                    color: sharedStyles.text,
                },
                style,
            ]}
        >
            {children}
        </Text>
    );
}
