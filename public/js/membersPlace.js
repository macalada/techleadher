var interests = new Set()
var filteredMembers = []
var func = undefined
var name = undefined
var currentPage = 1

function findMembers(interests) {
    // console.log(interests)
    // console.log(func)
    const members = []
    for (let i = 0; i < 50; i++) {
        members.push(
            {
                name: "John Doe",
                interests: ["networking", "design", "coding"],
                linkedin: "johndoe23",
                email: `johndoe${i}@hotmail.com`,
                preferableContact: "email",
                function: "mentor"
            }
        )
        members.push({
            name: "Jane Doe",
            interests: ["security", "development", "cloud"],
            linkedin: "janedoe22",
            email: `janedoe${i}@hotmail.com`,
            preferableContact: "linkedin",
            function: "mentee"
        })
    }
    // console.log(members)
    members.forEach(member => {
        const hasInterest = member.interests.some(memberInterest => interests.includes(memberInterest))
        const alreadyFound = Array.from(filteredMembers).some(fm => fm.email === member.email)
        const rightFunction = member.function === func
        const foundByName = compareNames(member)
        if (hasInterest && !alreadyFound && rightFunction) {
            filteredMembers.push(member)
        } else if (foundByName && !alreadyFound) {
            filteredMembers.push(member)
        } else if (!hasInterest && alreadyFound && !foundByName) {
            filteredMembers = filteredMembers.filter(fm => fm.name !== member.name)
        } else if (!rightFunction && !foundByName) {
            filteredMembers = filteredMembers.filter(fm => fm.name !== member.name)
        }
    })
    insertMembersList()
}

function handleInterests(value, interest) {
    if (value === true) {
        interests.add(interest)
    } else {
        interests.delete(interest)
    }
    findMembers(Array.from(interests))
}

function handleChosenFunction(target) {
    const value = target.value
    func = value
    findMembers(Array.from(interests))
}

function handleName(value) {
    console.log(value)
    name = value
    findMembers(Array.from(interests))
}

function compareNames(member) {
    if (member.name.substring(0, 3) === name.substring(0, 3)) {
        return true
    } else {
        return false
    }
}

function handlePages(page) {
    currentPage = page
    insertMembersList()
}

function insertMembersList() {
    const members = Array.from(filteredMembers)
    const paginatedMembers = currentPage === 1 ? members.filter((member, index) => index < Number(currentPage + '0'))
        : members.filter((member, index) => index < Number(currentPage + '0') && index >= Number((currentPage - 1) + '0'))
    const pages = [1]
    for (let i = 0; i < members.length + 1; i++) {
        if (i % 10 === 0 && i > 10) {
            pages.push(pages[pages.length - 1] + 1)
        }
    }
    // console.log(paginatedMembers)
    // console.log(members)
    var membersList = $(`<div>${paginatedMembers.map(member =>
        `
        <h4>${member.name}</h4>
        <span>${member.linkedin}</span><br/>    
        <span>Email: ${member.email}</span><br/>   
        Interests: <span>${member.interests.map(interest => ` ${interest}`)}</span><br/>
        `
    ).join('')
        }
        </div>
        <div>
        <ul class="pagination">
          ${pages.map(page =>
            `<li class="page-item">
                <button class="page-link" style="display: ${pages.length > 1 ? 'block' : 'none'}" onclick=handlePages(${page})>
                    ${page}
                </button>
            </li>`
        )
        }
        </ul>
      </div>
        `
    );
    if (paginatedMembers.length > 0) document.getElementById("card-body").style = "display: block"
    $(".card-body").html(membersList);
    membersList = undefined
}