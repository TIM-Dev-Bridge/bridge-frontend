import { render } from "@testing-library/react"
import { useProfile } from "./ProfileContext"
import { ProfileProvider } from "./ProfileContext"


describe("", ()=> {
    test("update profile", ()=> {
        const profile = useProfile()
        profile.updateProfile({
            access: "string",
            birth_date: "string",
            display_name: "string",
            email: "string",
            first_name: "string",
            last_name: "string",
            password: "string"
        })

        expect(profile.profile.access == "string")
    })

    test("render provider", ()=> {
        const { container } = render(
            <ProfileProvider>
                <div />
            </ProfileProvider>)
    })
})